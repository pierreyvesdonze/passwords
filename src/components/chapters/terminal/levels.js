export const levels = {
  1: {
    password: "12345",
    successMessage: "SUCCESS : Le niveau 2 est débloqué.",
    levelData: {
      startPath: "/",
      fileSystem: {
        "/": {
          type: "dir",
          children: {
            "readme.txt": {
              type: "file",
              content:
                "Welcome to Level 1!\nYour goal: find the password hidden in this directory.",
            },
            "password1.txt": {
              type: "file",
              content: "12345",
            },
            folder1: {
              type: "dir",
              children: {
                "note.txt": {
                  type: "file",
                  content:
                    "The password is hidden somewhere in this folder. Keep looking!",
                },
              },
            },
          },
        },
      },
    },
  },


2: {
    password: "92817",
    successMessage: "SUCCESS : Le niveau 3 est débloqué.",
    levelData: {
      startPath: "/",
      fileSystem: {
        "/": {
          type: "dir",
          children: {
            "instructions.txt": {
              type: "file",
              content:
                "Bienvenue au Niveau 2!\nLe mot de passe est caché dans un sous-dossier."
            },
            "docs": {
              type: "dir",
              children: {
                "clues.txt": {
                  type: "file",
                  content:
                    "Indice : le mot de passe est numérique et se trouve dans un fichier précis."
                },
                "secret": {
                  type: "dir",
                  children: {
                    "password2.txt": {
                      type: "file",
                      content: "92817"
                    }
                  }
                }
              }
            },
            "readme_level2.txt": {
              type: "file",
              content: "Explorez les dossiers et trouvez le mot de passe pour passer au niveau suivant."
            }
          }
        }
      }
    }
  },

  
  3: {
    password: "bison",
    successMessage: "SUCCESS : Le niveau 4 est débloqué.",
    levelData: {
      /* ... */
    },
  },
  // etc.
};
