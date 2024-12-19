Feature: User Finder
  Scenario: Find a user
    When I send a request to find a user with the email "john@doe.com"
    Then the user should be returned

  Scenario: User not found
    When I send a request to find a non-existent user with the email "not@existent.com"
    Then the response should be null
