export const levels = {
  1: {
    password: "science",
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
              content: "science",
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
    password: "culture",
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
                "Bienvenue au Niveau 2!\nLe mot de passe est caché dans un sous-dossier.",
            },
            docs: {
              type: "dir",
              children: {
                "clues.txt": {
                  type: "file",
                  content: "Indice : le mot de passe n'est pas.",
                },
                secret: {
                  type: "dir",
                  children: {
                    "password2.txt": {
                      type: "file",
                      content: "culture",
                    },
                  },
                },
              },
            },
            "readme_level2.txt": {
              type: "file",
              content:
                "Explorez les dossiers et trouvez le mot de passe pour passer au niveau suivant.",
            },
          },
        },
      },
    },
  },

  3: {
    password: "politique",
    successMessage: "SUCCESS : Le niveau 4 est débloqué.",
    levelData: {
      startPath: "/",
      fileSystem: {
        "/": {
          type: "dir",
          children: {
            "instructions.txt": {
              type: "file",
              content:
                "Bienvenue au Niveau 3.\nLe mot de passe est caché profondément.\nCertains chemins mènent à des impasses, d'autres à la vérité.",
            },

            archives: {
              type: "dir",
              children: {
                anciens: {
                  type: "dir",
                  children: {
                    "note.txt": {
                      type: "file",
                      content:
                        "On y croyait autrefois... mais ce dossier ne contient plus rien d’utile.",
                    },
                    fragments: {
                      type: "dir",
                      children: {
                        "fragment1.txt": {
                          type: "file",
                          content: "Le fragment 2 en dit long.",
                        },
                        "fragment2.txt": {
                          type: "file",
                          content:
                            "Ainsi le peuple se divisa à cause d'elle...",
                        },
                      },
                    },
                  },
                },

                dossiers_profonds: {
                  type: "dir",
                  children: {
                    "indice1.txt": {
                      type: "file",
                      content:
                        "La vérité est souvent dissimulée sous plusieurs couches.",
                    },
                    plus_loin: {
                      type: "dir",
                      children: {
                        encore_plus_loin: {
                          type: "dir",
                          children: {
                            "faux_piste.txt": {
                              type: "file",
                              content:
                                "Non... tu n'y es pas. Mais tu t'en rapproches peut‑être.",
                            },
                            coeur: {
                              type: "dir",
                              children: {
                                "message_final.txt": {
                                  type: "file",
                                  content:
                                    "Si tu lis ceci, c'est que tu persévères.\nCherche le fichier qui ne dit rien de bon.",
                                },
                                "vide.txt": {
                                  type: "file",
                                  content: "",
                                },
                                "merdique.txt": {
                                  type: "file",
                                  content: "politique",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },

            docs: {
              type: "dir",
              children: {
                "readme_level3.txt": {
                  type: "file",
                  content:
                    "Niveau 3 : approfondissez vos recherches. Tout n’est pas logique… mais rien n’est impossible.",
                },
                fausses_pistes: {
                  type: "dir",
                  children: {
                    "illusion.txt": {
                      type: "file",
                      content:
                        "Vous êtes probablement perdu. Mais on ne vous aidera pas.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  4: {
    password: "societe",
    successMessage: "SUCCESS : Le second chapitre est débloqué.",
    levelData: {
      startPath: "/",
      fileSystem: {
        "/": {
          type: "dir",
          children: {
            "enigme.txt": {
              type: "file",
              content:
                "Tu as deja reuni trois forces qui faconnent notre monde : comprendre, creer, organiser.\n\
                Trois piliers que tes precedents mots de passe ont chacun revele.\n\
                Ici, tout semble familier, pourtant plus rien n'a d'accent.\n\
                Cherche ce qui nait lorsque la science eclaire, lorsque la culture inspire,\n\
                et lorsque la politique structure.\n\
                Un tout plus vaste que ses elements, un ensemble auquel chacun appartient.\n\
                Trouve le mot qui resume cette construction invisible,\n\
                celui qui nous rassemble autant qu'il nous limite.",
            },
          },
        },
      },
    },
  },
};
