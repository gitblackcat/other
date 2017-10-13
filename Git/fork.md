当我fork了别人的代码,clone到自己本地,然后修改代码后,希望push到那个人的代码库的操作

问题描述: 当我们在`github`上`fork`出一个项目后,如果原有的项目更新了,怎样保持我们fork出来的项目和原有项目保持同步呢并提交我们的代码更新呢？即怎样保持fork出的项目和上游项目保持更新,怎样创建`pull request`?关键步骤是使用`git`的`rebase`命令

步骤

- 在 Fork 的代码库中添加上游代码库的 remote 源，该操作只需操作一次即可

如: 其中# upstream 表示上游代码库名， 可以任意。

`git remote add  upstream https://github.scm.corp.ebay.com/montage/frontend-ui-workspace`

上述命令中的`https`地址就是源项目的地址

- 将本地的修改提交`git add .`,`git commit -m 'xxx'`

- `git pull upstream branchName`

- `git push origin branchName`
