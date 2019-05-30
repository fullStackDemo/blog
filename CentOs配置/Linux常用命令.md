### Linux常用命令

[TOC]

#### 1、文件管理

|          |            |          |          |
| -------- | ---------- | -------- | -------- |
| cat      | chattr     | chgrp    | chmod    |
| chown    | cksum      | cmp      | diff     |
| diffstat | file       | find     | git      |
| gitview  | indent     | cut      | ln       |
| less     | locate     | lsattr   | mattrib  |
| mc       | mdel       | mdir     | mktemp   |
| more     | mmove      | mread    | mren     |
| mtools   | mtoolstest | mv       | od       |
| paste    | patch      | rcp      | rm       |
| slocate  | split      | tee      | tmpwatch |
| touch    | umask      | which    | cp       |
| whereis  | mcopy      | mshowfat | rhmask   |
| scp      | awk        | read     | updatedb |

简单例子：

 **命令 cat**

cat 命令用于连接文件并打印到标准输出设备上

语法格式

```
cat [-AbeEnstTuv] [--help] [--version] fileName
```

参数说明：

**-n 或 --number**：由 1 开始对所有输出的行数编号。

**-b 或 --number-nonblank**：和 -n 相似，只不过对于空白行不编号。

**-s 或 --squeeze-blank**：当遇到有连续两行以上的空白行，就代换为一行的空白行。

**-v 或 --show-nonprinting**：使用 ^ 和 M- 符号，除了 LFD 和 TAB 之外。

**-E 或 --show-ends** : 在每行结束处显示 $。

**-T 或 --show-tabs**: 将 TAB 字符显示为 ^I。

**-A, --show-all**：等价于 -vET。

**-e：**等价于"-vE"选项；

**-t：**等价于"-vT"选项；

 实例：

把 test1 的文档内容加上行号后输入 test2 这个文档里：

```bash
cat -n test1 > test2
```

把 test1 和 test2 的文档内容加上行号（空白行不加）之后将内容附加到 test3 文档里：

```bash
cat -b test1 test2 >> test3
```

清空 /etc/test.txt 文档内容：

```bash
cat /dev/null > /etc/test.txt
```

cat 也可以用来制作镜像文件。例如要制作软盘的镜像文件，将软盘放好后输入：

```bash
cat /dev/fd0 > OUTFILE
```

相反的，如果想把 image file 写到软盘，输入：

```bash
cat IMG_FILE > /dev/fd0
```

