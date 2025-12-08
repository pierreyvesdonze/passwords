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
            "clue.txt": {
              type: "file",
              content:
                "nous vivons tous dedans, en tant que citoyens, avec ses lois et nos devoirs",
            },
          },
        },
      },
    },
  },

  9: {
    password: "devi4nce-secret-h4ck",
    successMessage: "SUCCESS : Accès ADMIN autorisé.",
    levelData: {
      startPath: "/",
      fileSystem: {
        "/": {
          type: "dir",
          children: {
            "confidentiel.txt": {
              type: "file",
              content:
                "L'accès au terminal ADMIN est sécurisé et strictement limité au personnel autorisé. Toute intrusion dans le système sans autorisation préalable, entraînera des sanctions.",
            },
            ".cache.txt": {
              type: "file",
              content: "Inspecte-moi (clic droit -> inspecter)",
            },
          },
        },
      },
    },
  },

  10: {
    password: "COd3-R3d-D3plOy-2026",
    successMessage: "ACCÈS BASE DE DONNÉES CENTRALE GRANTED.",
    levelData: {
      startPath: "/",
      fileSystem: {
        "/": {
          type: "dir",
          children: {
            "readme.txt": {
              type: "file",
              content:
                "L'accès aux archives nécessite la clé. La clé est la phrase complète dissimulée dans les quatre registres : A, B, C et D. Commencez par le Registre A. (P.S. : Le Registre A est Banni). NB: Un bloc-note pourrait-être utile.",
            },
            Registre_A: {
              type: "dir",
              children: {
                "document_banni.txt": {
                  type: "file",
                  content:
                    "Ce fichier est corrompu et non lisible. Tout contenu y est banni de l'affichage.",
                },
                ".indice_a.txt": {
                  type: "file",
                  content:
                    "Le contenu est peut-être en dehors de ce terminal",
                },
              },
            },
            Archives: {
              type: "dir",
              children: {
                "FragmentB.txt": {
                  type: "file",
                  content: "Fragment B : R3d-",
                },
                System: {
                  type: "dir",
                  children: {
                    config_v7: {
                      type: "dir",
                      children: {
                        ".FragmentC.txt": {
                          type: "file",
                          content: "Fragment C : D3plOy-",
                        },
                      },
                    },
                  },
                },
                // Fragment D : Nécessite une commande spéciale (ex: ls -la)
                ".FragmentD.txt": {
                  type: "file",
                  content: "Fragment D : 2026",
                },
              },
            },

            // Cible finale
            DATABASE_ROOT: {
              type: "dir",
              children: {
                "PASS_FINAL.txt": {
                  type: "file",
                  content: "Accès refusé.",
                },
              },
            },
          },
        },
      },
    },
  },
};
