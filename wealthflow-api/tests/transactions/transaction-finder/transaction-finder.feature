Feature: Transaction Finder
  Scenario: Find transactions by userId
    When I send a request to find the transactions for the authenticated user
    Then the transactions should exist in the database

  Scenario: Find transactions by userId and criteria
    When I send a request to find the transactions for the authenticated user with criteria
    Then the transactions should exist in the database

