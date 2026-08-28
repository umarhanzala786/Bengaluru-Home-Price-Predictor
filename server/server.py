from flask import Flask, request, jsonify, session
from flask_cors import CORS
import database
try:
    from . import util
except ImportError:
    import util

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)   

# Secret key for login sessions
app.secret_key = "bengaluru-house-price-secret-key"

# Allow frontend requests
CORS(app)
database.init_db()
util.load_saved_artifacts()

@app.route("/")
def home():
    return app.send_static_file("home.html")


# =========================
# SIGNUP
# =========================
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({
            'success': False,
            'message': 'All fields are required'
        }), 400

    if len(password) < 6:
        return jsonify({
            'success': False,
            'message': 'Password must be at least 6 characters'
        }), 400

    existing_user = database.get_user_by_email(email)

    if existing_user:
        return jsonify({
            'success': False,
            'message': 'Email already registered'
        }), 409

    try:
        database.create_user(name, email, password)

        return jsonify({
            'success': True,
            'message': 'Account created successfully'
        }), 201

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


# =========================
# LOGIN
# =========================
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({
            'success': False,
            'message': 'Email and password are required'
        }), 400

    user = database.get_user_by_email(email)

    if not user:
        return jsonify({
            'success': False,
            'message': 'Invalid email or password'
        }), 401

    if not database.verify_password(password, user['password']):
        return jsonify({
            'success': False,
            'message': 'Invalid email or password'
        }), 401

    session['user_id'] = user['id']
    session['user_name'] = user['name']
    session['user_email'] = user['email']

    return jsonify({
        'success': True,
        'message': 'Login successful',
        'user': {
            'name': user['name'],
            'email': user['email']
        }
    })


# =========================
# LOGOUT
# =========================
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()

    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    })


# =========================
# CURRENT USER
# =========================
@app.route('/me', methods=['GET'])
def current_user():

    if 'user_id' not in session:
        return jsonify({
            'logged_in': False
        }), 401

    return jsonify({
        'logged_in': True,
        'user': {
            'id': session['user_id'],
            'name': session['user_name'],
            'email': session['user_email']
        }
    })


# =========================
# GET LOCATIONS
# =========================
@app.route('/get_location_names', methods=['GET'])
def get_location_names():

    response = jsonify({
        'locations': util.get_location_names()
    })

    return response


# =========================
# PREDICT HOME PRICE
# =========================
@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():

    # User must be logged in
    if 'user_id' not in session:
        return jsonify({
            'success': False,
            'message': 'Please login first'
        }), 401

    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    estimated_price = util.get_estimated_price(
        location,
        total_sqft,
        bhk,
        bath
    )

    # Save prediction
    conn = database.get_db()

    conn.execute("""
        INSERT INTO predictions
        (user_id, location, total_sqft, bhk, bath, estimated_price)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        session['user_id'],
        location,
        total_sqft,
        bhk,
        bath,
        estimated_price
    ))

    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'estimated_price': estimated_price
    })


# =========================
# PREDICTION HISTORY
# =========================
@app.route('/history', methods=['GET'])
def history():

    if 'user_id' not in session:
        return jsonify({
            'success': False,
            'message': 'Please login first'
        }), 401

    conn = database.get_db()

    predictions = conn.execute("""
        SELECT
            id,
            location,
            total_sqft,
            bhk,
            bath,
            estimated_price,
            created_at
        FROM predictions
        WHERE user_id = ?
        ORDER BY id DESC
    """, (session['user_id'],)).fetchall()

    conn.close()

    history_data = []

    for prediction in predictions:
        history_data.append({
            'id': prediction['id'],
            'location': prediction['location'],
            'total_sqft': prediction['total_sqft'],
            'bhk': prediction['bhk'],
            'bath': prediction['bath'],
            'estimated_price': prediction['estimated_price'],
            'created_at': prediction['created_at']
        })

    return jsonify({
        'success': True,
        'history': history_data
    })


# =========================
# START SERVER
# =========================
if __name__ == "__main__":

    print("Starting Bengaluru Home Price Predictor...")

    database.init_db()
    util.load_saved_artifacts()

    app.run(debug=True)