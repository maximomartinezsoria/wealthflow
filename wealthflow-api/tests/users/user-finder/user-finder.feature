Feature: User Finder
  Scenario: Find a user
    When I send a request to find a user with id "ac1f4b1e-3b4b-4b1e-9b1e-1b4c1b4c1b4c"
    Then the user should be returned

  Scenario: User not found
    When I send a request to find a non-existent user with id "1234"
    Then the response should be null
