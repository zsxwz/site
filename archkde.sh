#!/bin/bash

echo "user passwd"
echo "940209
940209" | passwd
useradd -m -g users -s /bin/bash wzk
echo "940209
940209" | passwd wzk

cat >> /etc/sudoers <<-'EOF'
wzk ALL=(ALL) ALL
EOF

echo "language"
sed -i 's/#en_US.UTF8 UTF-8/en_US.UTF8 UTF-8/' /etc/locale.gen
sed -i 's/^#zh_CN.UTF8.*/zh_CN.UTF8 UTF-8/g' /etc/locale.gen
cat >>/etc/locale.gen <<-'EOF'
en_US.UTF8 UTF-8
zh_CN.UTF8 UTF-8
EOF

locale-gen
echo LANG=en_US.UTF-8 > /etc/locale.conf

echo "zoneinfo"
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc --utc
date

pacman -S --noconfirm dosfstools grub efibootmgr os-prober
grub-install --target=x86_64-efi --efi-directory=/boot/EFI --bootloader-id=arch --recheck --debug
mkdir /boot/EFI/EFI/Boot
touch /boot/EFI/EFI/Boot/bootx64.efi
grub-mkconfig -o /boot/grub/grub.cfg

echo "drive"
pacman -S --noconfirm iw iwd wpa_supplicant dialog dhcpcd networkmanager vulkan-intel xf86-input-libinput intel-ucode intel-media-driver
pacman -S --noconfirm bluez bluez-utils
systemctl enable dhcpcd
systemctl enable iwd
systemctl enable NetworkManager.service
systemctl enable bluetooth.service

echo "xorg server"
pacman -S --noconfirm xorg
pacman -S --noconfirm xorg-xinit

echo "fonts"
pacman -S --noconfirm ttf-dejavu wqy-microhei adobe-source-han-sans-cn-fonts

echo "kde desktop"
pacman -S --noconfirm plasma kate konsole dolphin kfind kdialog

pacman -S --noconfirm sddm
systemctl enable sddm

echo "mac"
cat >> /etc/NetworkManager/NetworkManager.conf <<-'EOF'
[device]
wifi.scan-rand-mac-address=no
[connection]
wifi.cloned-mac-address=preserve
EOF

echo "hosts"
cat >> /etc/hosts <<-'EOF'
127.0.0.1	localhost
::1		localhost
127.0.0.1	archlinux.localdomain	archlinux
EOF

echo "y"|pacman -Scc

echo "all done"

