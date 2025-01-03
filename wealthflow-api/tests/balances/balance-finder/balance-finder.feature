Feature: Balance Finder
  Scenario: Find Balances by userId
    When I send a request to find the balances for the authenticated user
    Then the balances should exist in the database

