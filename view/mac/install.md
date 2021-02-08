# 重装电脑

1. command line tools
  1. code-select --install
    1.   xcode-select: error: command line tools are already installed, use "Software Update" to install updates
    2.  rm -rf /Library/Developer/CommandLineTools
    3. xcode-select --install
2. Homebrew
  1.  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  2. https://www.bbsmax.com/A/D854L3GQ5E/   [HELP]
3. Nvm  git 下载
  1. Node 8.9.4
4. github 链接
5. 关闭spotlight
  1.  sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist
  2.  sudo mdutil -i off