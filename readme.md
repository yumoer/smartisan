## 韩立涛组锤子官网项目分工：

	官网入口：https://www.smartisan.com/index

	首页 购物车 注册页 

	 韩立涛 张硕硕 马朝飞

	分类页 

 	李菲菲 史元元 王浩

## 适配方案：
	主体采用rem适配，局部使用百分比适配。小组成员可根据实际业务需求选择使用适配方案。

## 编码方面：多加注释 html结构 js css等有需要都要添加必要的注释，命名方式尽量有意义一点，采用驼峰命名方式

## 注意：大体分工这样，具体细节小小组内自己协商。分页交互可以自由发挥加些效果，尽可能的多使用一些交互，UI方面使用MUI。方便样式的统一，样式不一样的自己写less微调。工具类和css reset文件我会提供给大家。在git仓库的master里


1. 新建一个文件夹用自己名字小写字母命名
2. 在这个文件夹内部 鼠标右键菜单 Git bash here
3. git init
4. git clone git@github.com:chno1/Jason-Team.git

   git remote add origin git@github.com:chno1/Jason-Team.git
5. git checkout -b 名字全拼小写
6. git branch 如果显示了你刚才创建的分支就ok了
7. vi test.txt 
8. 进去输入 i 或者 Ins（插入键）随便写点文字
9. 然后按esc 
10. 然后按shift+： 
11. 然后按wq
12. git add test.txt
13. git commit -m "xx完成了xx功能"
14. git status 如果test.txt显示的是绿色的就没问题
15. git push origin 分支名  如果可以正常上传那就ok了
![](https://i.imgur.com/aXiU151.png)
##本地的这个以你名字命名的文件夹就是你以后的工作目录。你的项目就放到这个文件夹底下就可以。任何文件的修改和删除在本地进行就可以。完事了重复12-15的上传步骤就可以，服务器可以自动给你同步。线上项目地址 https://github.com/chno1/Jason-Team
可以查看项目进度以及自己和别人的分支：如下图，点击可以切换分支，如果看到了自己的分支就完全没有问题了。
![](https://i.imgur.com/skt9mIk.png)
###注意：每次做完不要忘记上传，本地文件下除了.git文件夹不要随意修改和删除以外，其他文件都没问题，正常做完上传就是12-15步，只要文件有修改就可以上传不会产生冲突。
![](https://i.imgur.com/pTeJkwP.png)
###每次上传之前看看是不是在自己分下面（hanlitao）就是自己的分支，如果是master或者其他的就要切换到自己的分支，命令 git checkout 分支名，分支命名错了可以使用git branch -d 分支名 删除分支，在进行创建。
![](https://i.imgur.com/D9RRJRP.png)