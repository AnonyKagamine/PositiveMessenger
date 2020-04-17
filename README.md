# PositiveMessenger
正能量信使，能够用正能量的话语承载二进制数据。
感谢 [menzi11/BullshitGenerator](https://github.com/menzi11/BullshitGenerator) 以及 [UMRnInside/BoshMessenger](https://github.com/UMRnInside/BoshMessenger)

## Usage
`boshencode.py` 和 `boshdecode.py` 都从标准输入 `stdin` 读取数据、从标准输出 `stdout` 输出结果。

```
# 原文件: original.bin

# 编码
python3 boshencode.py < original.bin > bosh.txt

# 解码
python3 boshdecode.py < bosh.txt > decoded.bin
```

## Note
目前，原版废话信使 _BoshMessenger_ 一次只能够传递 65535 字节的信息（原文为 32767，可能是原作者笔误）。

注意，废话信使的放大倍数（编码后文件大小 / 原始文件大小）很大。

本人特意减短了 `data.json` 中名言的长度，使得编码效率略微提升。然而，放大倍数还是居高不下 :(

| 编码      | 放大倍数 | 正能量信使 |
| -------- | ------- | --------- |
| UTF-8    | 100     | 72        |
| GBK      | 65      | 48        |

<del>这可是真的废话</del>
