defmodule Bulls.BullsTest do
  use ExUnit.Case
  import Bulls.Game

  test "not unique" do
    assert !not_unique("4321")
    assert not_unique("1111")
    assert not_unique("4124")
  end

  test "get message" do
    assert get_message("1234") == "Enter a unique 4-digit number"
    assert get_message("1abc") == "Error: Must enter a 4-digit number"
    assert get_message("dabc") == "Error: Must enter a 4-digit number"
    assert get_message("123") == "Error: Number is not 4 digits"
    assert get_message("1231") == "Error: All 4 digits must be unique"
  end

  test "get bulls" do
    assert get_bulls("1234", "1234") == 4
    assert get_bulls("1234", "4321") == 0
    assert get_bulls("1234", "7654") == 1
  end

  test "get cows" do
    assert get_cows("1234", "1234") == 0
    assert get_cows("1234", "4321") == 4
    assert get_cows("1234", "1230") == 0
    assert get_cows("1234", "3412") == 4
    assert get_cows("1234", "7381") == 2
    assert get_cows("1234", "0196") == 1
    assert get_cows("1234", "1342") == 3
  end

  test "valid guess" do
    assert valid_guess("1234")
    assert !valid_guess("1abc")
    assert !valid_guess("dabc")
    assert !valid_guess("123")
    assert !valid_guess("1231")
  end
end
