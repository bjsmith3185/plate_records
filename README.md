# plate_records   https://knowyourstop.herokuapp.com/

This App could assist a LEO during a traffic stop investigation.

Previously a LEO only had access to a vehicle or drivers official history record ( a conviction on their driving record, or general vehicle information ). There was no record of each time the vehicle was stopped and the outcome of that stop. 

This app will allow the LEO to view detailed information for each time a vehicle was investigated.

        *** Functionality of the App ***

The user enters a vehicle tag (and state*)
    * If state is entered the search will be executed faster
    * If no state is entered, the app will search all available collections (state databases)
       and return all matches. The user will then select the result that corresponds to their encounter.

A search will result in:
    1) vehicle information 
    2) any previous vehicle stops and interaction with a LEO.


If a search located a tag in the database the user has access to the following information:

    Vehicle:
        - Tag
        - State
        - Vehicle Make
        - Vehicle Model
        - Vehicle Year
        - Vehicle Color
        - Owner
        - Owner Address

If the vehicle has been stopped previously and data was entered about that encounter the user will be able to view:

    - Previous encounters with a LEO
        - Driver during the encounter
        - Date of encounter
        - Location (Street, City, State)
        - Reason for the encounter
        - Result of the encounter (Warning, Citation)
        - Noted from the LEO about the encounter

The user has the ability to add data for a vehicle stop. The following fields can be added:
        - Driver during the encounter
        - Date of encounter
        - Location (Street, City, State) *
        - Reason for the encounter
        - Result of the encounter (Warning, Citation, etc) *
        - Noted from the LEO about the encounter
        
        * Denotes fields that have a default value, which can be changed.

    Note: The signed in user's information will be attached to any data added for an encounter.



The app requires the user to login to make search request and to add a vehicle encounter. If the user is not logged in they can not access data. The purpose of this app is to provide additional information in order to keep citizens and officers safe.

Note: The demo links in this version will be removed and are only there for demo purposes.



