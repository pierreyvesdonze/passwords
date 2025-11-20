const levelData = {
  startPath: "/",
  fileSystem: {
    "/": {
      type: "dir",
      children: {
        "readme.txt": {
          type: "file",
          content: "Welcome to Level 1!\nYour goal: find the password hidden in this directory."
        },
        "password1.txt": {
          type: "file",
          content: "12345"
        },
        "folder1": {
          type: "dir",
          children: {
            "note.txt": {
              type: "file",
              content: "The password is hidden somewhere in this folder. Keep looking!"
            }
          }
        }
      }
    }
  }
};

export default levelData;
