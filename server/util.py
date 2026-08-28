import pickle
import json
import numpy as np
import os
__locations = None
__data_columns = None
__model = None

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")

    global __data_columns
    global __locations
    global __model

    base_dir = os.path.dirname(os.path.abspath(__file__))
    artifacts_dir = os.path.join(base_dir, "artifacts")

    columns_path = os.path.join(artifacts_dir, "columns.json")
    model_path = os.path.join(
        artifacts_dir,
        "banglore_home_prices_model.pickle"
    )

    with open(columns_path, "r") as f:
        __data_columns = json.load(f)["data_columns"]
        __locations = __data_columns[3:]

    if __model is None:
        with open(model_path, "rb") as f:
            __model = pickle.load(f)

    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar',1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(get_estimated_price('Kalhalli', 1000, 2, 2)) # other location
    print(get_estimated_price('Ejipura', 1000, 2, 2))  # other location

    
# import json
# import pickle
# import numpy as np

# __locatiion = None
# __data_columns = None
# __model = None

# def get_estimated_price(location , sqft, BHK,bath):
#     try:
#         loc_index = __data_columns.index(location.lower())
#     except:
#         loc_index = -1

#     x = np.zeros(len(__data_columns))
#     x[0] = sqft
#     x[1] = bath
#     x[2] = BHK
#     if loc_index >= 0:
#         x[loc_index] = 1
#     return round(__model.predict([x])[0],2)


# def get_location_names():
#     return __locatiion

# def load_saved_artifacts():
#     print("loading saved artifacts.......strat")
#     global __data_columns
#     global __locatiion

#     with open("./artifacts/columns.json" , 'r') as f:
#         __data_columns = json.load(f)['data_columns']
#         __locatiion = __data_columns[3:]

#     global __model
#     with open("./artifacts/banglore_home_prices_model.pickle" , 'rb') as f:
#         __model = pickle.load(f)

#     print("loading saved artifacts.......done")

# if __name__ == '__main__':
#     load_saved_artifacts()
#     print(get_location_names())
#     print(get_estimated_price('1st phase jp nagar',1000,3,3))
#     print(get_estimated_price('1st phase jp nagar',1000,2,2))
#     print(get_estimated_price('Kalhalli',1000,2,2))
#     print(get_estimated_price('Ejipura',1000,2,2))
