from random import
def mm(niv=4, couleurs=6):
   c=1
   secret=[str(randint(1,coul)) for i in range(niv)]
    while True:
        code=list(secret)
        j=list(input("Coup"+str(c)+":"))
        if len(j)==0:return"Perdu salle nulos il s'agirais d'etre meilleur"+"".join(secret)
         c+=1
         bien, mal=0,0
         for i,v in enumerate(j):
            if v == code[i]:
                bien += 1
                j[i]="#"
                code[i]="*"
         if bien == 4: return "Gagne! Ba tu vois C T pas si dur que sa!!"
         for i,v in enumerate(j): 
            if v in code :
                mal += 1 
                code[code.index(v)] = "*"    
         print("Bien: {},Mal: {}" .format(bien,mal))       