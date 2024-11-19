Feature: User Creator
  Scenario: Create a new user
    Given the API is running
    When I send a request to create a user with the email "john@doe.com" and name "John Doe"
    Then the response status should be 201
    And the user should exist in the database