import random

def generate_code():
    colors = ['R', 'G', 'B', 'Y', 'O', 'P']  
    code = random.sample(colors, 4)  
    return code

def get_guess():
    guess = input("Entrez votre proposition de code (ex. RGBY) : ").upper()
    if len(guess) != 4 or not all(color in 'RGBYOP' for color in guess):
        print("Veuillez entrer une proposition valide.")
        return get_guess()
    return list(guess)

def evaluate_guess(code, guess):
    correct_color_and_position = 0
    correct_color_only = 0

    code_copy = list(code)  

    for i in range(len(guess)):
        if guess[i] == code_copy[i]:
            correct_color_and_position += 1
            code_copy[i] = None

    for i in range(len(guess)):
        if guess[i] in code_copy:
            correct_color_only += 1
            code_copy[code_copy.index(guess[i])] = None

    return correct_color_and_position, correct_color_only

def play_game():
    print("Bienvenue dans Mastermind !")
    print("Les couleurs possibles sont : R (rouge), G (vert), B (bleu), Y (jaune), O (orange), P (violet).")
    print("Essayez de deviner le code secret en utilisant les initiales des couleurs.")
    print("Vous avez 12 tentatives.")

    code = generate_code()
    attempts = 0

    while attempts < 12:
        print("\nTentative", attempts + 1)
        guess = get_guess()
        correct_color_and_position, correct_color_only = evaluate_guess(code, guess)

        if correct_color_and_position == 4:
            print("Félicitations ! Vous avez trouvé le code secret en", attempts + 1, "tentatives.")
            return

        print("Couleurs correctes et bien placées :", correct_color_and_position)
        print("Couleurs correctes mais mal placées :", correct_color_only)

        attempts += 1

    print("Désolé, vous avez épuisé vos tentatives. Le code secret était :", ''.join(code))

play_game()
