This is a parking space rental system that includes both front-end and back-end parts. 
The front-end is developed using React and the back-end uses Spring Boot and SQLite.


GitHub Repository
You can access the project on GitHub at [https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11ateamwinning5.git]


Steps to use:
1. Start the back-end service: 			'mvn spring-boot:run'
2. Install the front-end dependencies: 		'npm install'
3. Commands to install Sass:			'npm i sass --save-dev'
4. Start the front-end service:			'npm run start'



Code structure
- 'java': backend code, including controllers, services, entities, repositories, etc.
- ' web' : front-end code, including components, styles, images, etc.



Main Functions:
Register: When the user register from the main page, the website ask the user to provide the personal information of him or her,
 and the email is unique for every user and the user should fill in the blank with the email format, there's still some requirement of 
the password, it requires the user to have the upper case and lower case letter and number in the password.

Log in: When the user logs in, he/she should use the email and the password and these two information should match.

Listing: The format of the available time should be end with am/pm for the firefox browser in vlab and for chrome the user just have to
choose the exact time.

Profile: When the user wants to change the password, he/she should fill in the correct password and make sure the new password fit 
the requirement of password as it has lower case and upper case letter and has number.

Billing: When the user wants to withdraw the earnings then he/she has to fill in the bank information first, it include 
the bank account number with 16 digits and the 3 digits CVV and the expire date must before the day when 

Listings: This is where users can view and manage their posted parking spaces, including modifying and deleting them. 
Additionally, users can view information about their parking spaces being reserved, as well as post new parking spaces.

Reservations: Here users can view currently reserved spaces and completed reservations.
