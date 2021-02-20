/**
 * I used Prof. Tuck's Hangman lecture code as a starting point.
 * I left some of his code here, such as uniq() and lives_left(), but I had
 * to write a lot of new code to program the necessary logic for Bulls and Cows.
 */
export function uniq(xs) {
    return Array.from(new Set(xs));
}

function not_unique(text) {
    let nums = Array.from(text);
    let sorted_nums = nums.sort();
    return sorted_nums[0] === sorted_nums[1] ||
        sorted_nums[1] === sorted_nums[2] ||
        sorted_nums[2] === sorted_nums[3];
}

export function get_message(text) {
    let message = "";
    if (isNaN(parseInt(text))) {
        message = "Error: Must enter a 4-digit number";
    } else if (text.length < 4) {
        message = "Error: Number is less than 4 digits";
    } else if (not_unique(text)) {
        message = "Error: All 4 digits must be unique";
    } else {
        message = "Enter a unique 4-digit number";
    }
    return message;
}

export function get_number() {
    let solution = "";
    while (solution.length < 4) {
        let digit = Math.floor((Math.random() * 10));
        while (!solution.includes(digit.toString())) {
            solution += digit.toString();
        }
    }
    return solution;
}

export function get_bulls(secret, guess) {
    let bulls = 0;
    for (let i = 0; i < 4; i++) {
        if (guess.charAt(i) === secret.charAt(i)) {
            bulls++;
        }
    }
    return bulls;
}

export function get_cows(secret, guess) {
    let cows = 0;
    for (let i = 0; i < 4; i++) {
        if (secret.includes(guess.charAt(i))) {
            cows++;
        }
    }
    cows -= get_bulls(secret, guess);
    return cows;
}

export function bad_guesses(secret, guesses) {
    let bads = [];
    for (let gg in guesses) {
        let curr = guesses[gg];
        if (parseInt(secret) !== parseInt(curr)) {
            if (!isNaN(parseInt(curr)) && curr.length === 4 && !not_unique(curr)) {
                bads.push(guesses[gg]);
            }
        }
    }
    return uniq(bads);
}

export function lives_left(secret, guesses) {
    return 8 - bad_guesses(secret, guesses).length;
}
