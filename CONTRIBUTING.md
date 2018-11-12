## Contributing

Thank you for considering contributing to Memory Blocks Game. 
Memory Blocks Game is an open source project and we love to receive contributions from community. 
There are many ways to contribute, from writing tutorials, improving the documentation, design, add features,
submitting bug reports or writing code which can be incorporated into Memory Blocks Game.

## How to start

If you've noticed a bug or have a question, [search the issue tracker][] to see if
someone else in the community has already created a ticket. If not, go ahead and
[make one][new issue]!

### Fork repository & create a branch

If this is something you think you can fix, then [fork Memory Blocks Game][] and
create a branch with a descriptive name which contains issue #.

For instance:

```sh
git checkout -b 01-add-user-help
```

### Install repository 

Go follow README.md to install and deploy Memory Block Games

### If you find a bug

* **Ensure the bug was not already reported** by [searching all issues][].

* If you're unable to find an open issue addressing the problem,
  [open a new one][new issue]. Be sure to include a **title and clear
  description**, as much relevant information as possible, and a **code sample**
  or an **executable test case** demonstrating the expected behavior that is not
  occurring.

### Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help.

### Make a Pull Request

Update your feature branch from your local copy of master, and push it!

```sh
git checkout 01-add-user-help
git rebase master
git push origin 01-add-user-help
```

Finally, go to GitHub and [make a Pull Request][]

### Keeping your Pull Request updated

If a lot of code has changed you have to "rebase" your PR , and that you need to update your branch 
so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good][git rebasing]
[resources][interactive rebase] but here's the suggested workflow:

```sh
git checkout 01-add-user-help
git pull --rebase upstream master
git push --force-with-lease 01-add-user-help
```

