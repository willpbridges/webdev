defmodule Bulls.Game do
  def new do
    %{
      secret: get_number(""),
      guesses: MapSet.new(),
      text: "",
      message: "Enter a unique 4-digit number",
      hints: []
    }
  end

  def guess(st, num) do
    cond do
      valid_guess(num) ->
        %{st | guesses: MapSet.put(st.guesses, num)}

      true ->
        %{st | guesses: st.guesses}
    end
  end

  def view(st) do
    num = st.secret
    hints = Enum.map(st.guesses, fn x -> get_hints(num, x) end)

    %{
      hints: hints,
    }
  end

  def valid_guess(guess) do
    guess |> Integer.parse() != :error &&
      guess |> Integer.parse() |> elem(1) == "" &&
      guess |> String.length() == 4 &&
      !(guess |> not_unique())
  end

  def not_unique(text) do
    nums = String.split(text, "", trim: true)
    sorted_nums = Enum.sort(nums)

    sorted_nums |> Enum.at(0) === sorted_nums |> Enum.at(1) ||
      sorted_nums |> Enum.at(1) === sorted_nums |> Enum.at(2) ||
      sorted_nums |> Enum.at(2) === sorted_nums |> Enum.at(3)
  end

  def get_message(text) do
    cond do
      text |> Integer.parse() == :error ->
        "Error: Must enter a 4-digit number"

      text |> Integer.parse() |> elem(1) != "" ->
        "Error: Must enter a 4-digit number"

      text |> String.length() != 4 ->
        "Error: Number is not 4 digits"

      text |> not_unique() ->
        "Error: All 4 digits must be unique"

      true ->
        "Enter a unique 4-digit number"
    end
  end

  def get_number(num) do
    digit = Enum.random(0..9) |> Integer.to_string()

    cond do
      num |> String.length() == 4 ->
        num

      String.contains?(num, digit) ->
        get_number(num)

      true ->
        get_number(num <> digit)
    end
  end

  def get_hints(secret, guess) do
    bulls = get_bulls(secret, guess) |> Integer.to_string()
    cows = get_cows(secret, guess) |> Integer.to_string()
    "" <> guess <> " | Bulls: " <> bulls <> ", Cows: " <> cows
  end

  def get_bulls(secret, guess) do
    len = guess |> String.length()
    secret_tail = secret |> String.slice(1, len)
    guess_tail = guess |> String.slice(1, len)

    cond do
      guess |> String.length() == 0 ->
        0

      String.first(secret) === String.first(guess) ->
        1 + get_bulls(secret_tail, guess_tail)

      true ->
        get_bulls(secret_tail, guess_tail)
    end
  end

  def get_cows(secret, guess) do
    len = guess |> String.length()
    guess_tail = guess |> String.slice(1, len)

    cond do
      guess |> String.length() == 0 ->
        0

      secret |> String.contains?(guess |> String.first()) ->
        if len == 4 do
          1 + get_cows(secret, guess_tail) - get_bulls(secret, guess)
        else
          1 + get_cows(secret, guess_tail)
        end

      true ->
        if len == 4 do
          get_cows(secret, guess_tail) - get_bulls(secret, guess)
        else
          get_cows(secret, guess_tail)
        end
    end
  end
end
