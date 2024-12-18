# QAirline

## API usage guide (here for now since can't have wiki if not a public repo)

naming based on this: https://restfulapi.net/resource-naming/
The routes below can also be posted to with the same data excluding the id field
### Airport (/flights/airports) lists airport collection or /flights/airports/{id} for specific airport  
[
    {
        "id": 1,
        "code": "HAN",
        "city": "HaNoi",
        "name": "Noi Bai International Airport"
    },
]
### Plane (/flights/planes), the same as the above (ADMIN)  
[
    {
        "id": 1,
        "registration_number": "G-somethingsomething",
        "manufacturer": "Boeing",
        "model": "dmquan",
        "first_class_capacity": 2,
        "business_class_capacity": 2,
        "premium_class_capacity": 2,
        "economy_class_capacity": 2,
        "current_airport": 1
    }
]
### Flight (/flights/flights), same as above, delay will default to 0 if no value is supplied  
[
    {
        "id": 1,
        "departure_time": "2024-12-04T08:24:00+07:00",
        "delay": 0,
        "arrival_time": "2024-12-05T08:24:00+07:00",
        "base_price": "10.00",
        "plane": 1,
        "origin_airport": 1,
        "destination_airport": 2
    },
]
### available seats (/flights/flights/{id}/seats) GET route returns the available seats  
[
    {
        "id": 3,
        "row": "1",
        "column": "C",
        "is_available": true,
        "seat_class": "2",
        "price": "20.00",
        "flight": 1
    },
]
### find flight (/flights/find) POST route  
Request:  
{
    "from_date": "2024-12-01",
    ~~"to_date": "2024-12-12",~~
    "from_airport": 1,
    "to_airport": 2
}  
Response: return an array of flights like the above that fits the criteria

### Tickets (/tickets)  (ADMIN OR OWNER)
example POST request:  
{
    "customer": 10,
    "flight": 5,
    "seat": 23
}  
response  
[
    {
        "id": 3,
        "price": 40,
        "ordered_time": "2024-12-04T14:11:34.568490+07:00",
        "booked_by": 1,
        "customer": 10,
        "flight": 5,
        "seat": 23
    },
]

### Cancel ticket (/tickets/{id}) send DELETE request and has to be owner of the ticket (ADMIN OR OWNER)  

### Customer (/users/customers) show customers info (ADMIN OR OWNER)  
example POST request:  
{
    "first_name": "das",
    "last_name": "cxz",
    "birthday": "2002-11-11",
    "country": "VN",
    "phone_number": "2432432",
    "email": "2@gmail.com",
    "gender": "M"
}  
Response:  
[
    {
        "id": 1,
        "first_name": "q",
        "last_name": "a",
        "birthday": "2024-12-04",
        "country": "VN",
        "phone_number": "a",
        "email": "a@a.com",
        "gender": "M",
        "created_by": 1
    },
]
### User (/users/users) shows users info (ADMIN OR OWNER)  
[
    {
        "id": 1,
        "username": "admin",
        "email": "admin@admin.com",
        "booked_tickets": [
            3,
            4,
            7,
            8
        ],
        "customers": [
            1,
            2,
            3
        ]
    },
]
### Register (/users/users) POST route to register user
{
    "username": "test",
    "email": "test@test.com",
    "password": "password"
}
### Login (/api/token) POST route to obtain token for user
example request:  
{
    "username": "test",
    "password": "password"
}  
response:  
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MTc5ZbbzMywiaWF0IjoxNzM0MDE2MDMzLCJqdGkiOiI2ZjgxOTJmZGJmZmE0YTBmYjliY2VkNmRkYjdhYWEwYyIsInVzZXJfaWQiOjR9.TRN8UyRBGYpXE9_vm9WWCqvupfVTKNcXeO2ujQepcS4",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MDE5NjMzLCJpYXQiOjE3MzQwMTYwMzMsImp0aSI3N4M5YzNlYWM3ZDI0ZDQ2MzI5NzllYzI1YWM1ODllNWUzIiwidXNlcl9pZCI6NH0.1fzPXKx1Re8KnJvf2PJ8BTZfNH2asem5_9xO6m43BbY"
}
