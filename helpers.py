import os
from flask import session
from datetime import datetime

#######################
## helpful variables ##
#######################
DBUSER = os.environ["MYSQL_USER"]
DBPW = os.environ["MYSQL_PW"]
PAYPAL_USER = os.environ["PAYPAL_USER"]
PAYPAL_TOKEN = os.environ["PAYPAL_TOKEN"]

CURR_USER = "logged_in_user"

#############################
## login/logout of session ##
#############################
def login_session(user):
    """Log in a registered user to session."""
    session[CURR_USER] = user.id

def logout_session():
    """Remove user who is logging out from session."""
    del session[CURR_USER]

#################################
### external PayPal API calls ###
#################################


##################
## misc helpers ##
##################
def logical_date_time(timestamp):
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    hour = timestamp.hour
    am_or_pm = "AM"
    if hour >= 12:
        am_or_pm = "PM"
    if hour > 12:
        hour -= 12
    if hour == 0:
        hour = 24

    return f'{timestamp.year} {months[timestamp.month]} {timestamp.day}, {hour}:{timestamp.minute}{am_or_pm}'

def is_today_april_fools():
    now=datetime.now()
    today = now.strftime("%D")
    today_split = today.split('/')
    if today_split[0] == "04" and today_split[1] == "01":
        return True
    return False

def concatinate_lists(list_of_lists):
    """concatinates a list of lists into one list
    
    >>> concatinate_lists( [ [1, 2, 3], [4, 5, 6] ] )
    [1, 2, 3, 4, 5, 6]
    """
    concatinated_list = []
    for list in list_of_lists:
        for item in list:
            concatinated_list.append(item)

    return concatinated_list
