# Funzione per inizializzare il tabellone
def crea_tabellone():
    return [[' ' for _ in range(3)] for _ in range(3)]

# Funzione per stampare il tabellone
def stampa_tabellone(tabellone):
    print("\n")
    for riga in tabellone:
        print("|".join(riga))
        print("-" * 5)

# Funzione per verificare se un giocatore ha vinto
def controlla_vittoria(tabellone, simbolo):
    # Controlla righe
    for i in range(3):
        vinta = True
        for j in range(3):
            if tabellone[i][j] != simbolo:
                vinta = False
                break
        if vinta:
            return True

    # Controlla colonne
    for i in range(3):
        vinta = True
        for j in range(3):
            if tabellone[j][i] != simbolo:
                vinta = False
                break
        if vinta:
            return True

    # Controlla diagonali
    if tabellone[0][0] == simbolo and tabellone[1][1] == simbolo and tabellone[2][2] == simbolo:
        return True
    if tabellone[0][2] == simbolo and tabellone[1][1] == simbolo and tabellone[2][0] == simbolo:
        return True

    return False

# Funzione per verificare se la partita è finita in pareggio
def controlla_pareggio(tabellone):
    for riga in tabellone:
        if ' ' in riga:
            return False
    return True

# Funzione per gestire il turno del giocatore
def esegui_turno(tabellone, giocatore):
    while True:
        # Chiedi l'input dell'utente per la riga
        riga_input = input(f"{giocatore['nome']}, scegli la riga (0-2): ")
        colonna_input = input(f"{giocatore['nome']}, scegli la colonna (0-2): ")
        
        # Verifica che l'input sia numerico e che rientri nei limiti
        if riga_input.isdigit() and colonna_input.isdigit():
            riga = int(riga_input)
            colonna = int(colonna_input)
            if 0 <= riga < 3 and 0 <= colonna < 3 and tabellone[riga][colonna] == ' ':
                tabellone[riga][colonna] = giocatore['simbolo']
                break
            else:
                print("Posizione non valida o già occupata. Riprova.")
        else:
            print("Input non valido. Assicurati di inserire numeri compresi tra 0 e 2.")

# Funzione principale che gestisce l'intero gioco
def gioco_tic_tac_toe():
    # Inizializzare i giocatori e il punteggio
    giocatore1 = {'nome': input("Nome del primo giocatore: "), 'simbolo': 'X', 'vittorie': 0}
    giocatore2 = {'nome': input("Nome del secondo giocatore: "), 'simbolo': 'O', 'vittorie': 0}
    giocatori = [giocatore1, giocatore2]
    
    partita_completata = False
    while not partita_completata:
        tabellone = crea_tabellone()
        turno = 0
        while True:
            # Stampa il tabellone
            stampa_tabellone(tabellone)
            
            # Esegui il turno del giocatore corrente
            esegui_turno(tabellone, giocatori[turno % 2])
            
            # Controlla se qualcuno ha vinto
            if controlla_vittoria(tabellone, giocatori[turno % 2]['simbolo']):
                print(f"\n{giocatori[turno % 2]['nome']} ha vinto!")
                giocatori[turno % 2]['vittorie'] += 1
                break
            
            # Controlla se è un pareggio
            if controlla_pareggio(tabellone):
                print("\nLa partita è finita in pareggio!")
                break
            
            turno += 1
        
        # Mostra il punteggio
        print(f"\nPunteggio: {giocatore1['nome']} ({giocatore1['vittorie']}) - {giocatore2['nome']} ({giocatore2['vittorie']})")
        
        # Controlla se qualcuno ha vinto al meglio dei 3
        if giocatore1['vittorie'] == 2:
            print(f"\n{giocatore1['nome']} ha vinto la sfida!")
            partita_completata = True
        elif giocatore2['vittorie'] == 2:
            print(f"\n{giocatore2['nome']} ha vinto la sfida!")
            partita_completata = True
        
        # Chiede se i giocatori vogliono continuare
        if not partita_completata:
            ripeti = input("Vuoi continuare? (sì/no): ").lower()
            if ripeti != 'sì':
                partita_completata = True
                print("Grazie per aver giocato!")

# Avvia il gioco
gioco_tic_tac_toe()
