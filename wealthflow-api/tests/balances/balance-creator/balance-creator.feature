Feature: Balance Creator
  Scenario: Create Balance
    When I send a request to create a balance for user with id "1" and name "Savings"
    Then the balance should exist in the database

  # Scenario: User not found
  #   When I send a request to create a balance for a non-existent user with id "2"
  #   Then the response should return an error message "User not found"

  # Scenario: Invalid amount
  #   When I send a request to create a balance for user with id "1" and amount "-1"
  #   Then the response should return an error message "Amount can't be negative"

  # Scenario: User already has a balance with the same name
  #   When I send a request to create a balance with for user id "1" and name "Savings"
  #   Then the response should return an error message "User already has a balance with the same name"
