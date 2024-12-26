Feature: User Finder
  Scenario: Find a user
    When I send a request to find a user with id "9d751e0e-73e5-4330-b413-28ebff41c3b0"
    Then the user should be returned

  Scenario: User not found
    When I send a request to find a non-existent user with id "1"
    Then the response should be null
