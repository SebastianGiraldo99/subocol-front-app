import json
cities = [
        {"name": "New York", "country": "United States of America", "lat": "40.714", "lon": "-74.006", "timezone_id": "America/New_York", "utc_offset": "-5.0", "temperature": -3},
        {"name": "Bogotá", "country": "Colombia",  "lat": "4.6097", "lon": "-74.0817", "timezone_id": "America/Bogota", "utc_offset": "-5.0","temperature": 10},
        {"name": "London", "country": "United Kingdom", "lat": "51.5074", "lon": "-0.1278", "timezone_id": "Europe/London", "utc_offset": "0.0","temperature": 2},
        {"name": "Tokyo", "country": "Japan",  "lat": "35.6895", "lon": "139.6917", "timezone_id": "Asia/Tokyo", "utc_offset": "9.0","temperature": 4},
        {"name": "Sydney", "country": "Australia", "lat": "-33.8688", "lon": "151.2093", "timezone_id": "Australia/Sydney", "utc_offset": "11.0","temperature": 31}
        ]

def searchTime(name):
    return next((city for city in cities if city["name"].lower() == name.lower()), None)


def lambda_handler(event, context):
    name = event['name']
    access_key = event['access_key']

    if name != '' and access_key != '':
        city = searchTime(name)
        if city :
            print(json.dumps(city, indent=2))
        else:
            print("Not information fot this city")
    else:
        errorResponse = {
            "success": "false",
            "error": {
                "code": 601,
                "type": "missing_query",
                "info": "You need send the complete parameters"
            }
        }
        print(json.dumps(errorResponse,indent=2))




