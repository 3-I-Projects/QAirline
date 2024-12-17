import datetime
from django.utils import timezone

def purge_unpaid_tickets(flight, minutes=5):
    filled_seats = flight.seats.filter(is_available=False)
    for seat in filled_seats:
        if not hasattr(seat, 'booked_ticket'):
            continue
        if seat.booked_ticket.status == 'Paid':
            continue

        time_since_booking = timezone.now() - seat.booked_ticket.ordered_time
        if time_since_booking > datetime.timedelta(minutes=minutes):  # assuming 5 min is the threshold
            seat.is_available = True
            tik = seat.booked_ticket
            tik.status = 'Cancelled'
            tik.save()
            seat.booked_ticket = None
            seat.save()