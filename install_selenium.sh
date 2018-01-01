CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`
SELENIUM_STANDALONE_VERSION=3.7.1
SELENIUM_SUBDIR=$(echo "$SELENIUM_STANDALONE_VERSION" | cut -d"." -f-2)
INSTALLATION_DIR=$(pwd)/bin

echo installing chromedriver and selenium-standalone into $INSTALLATION_DIR

# install java
brew cask install java

# install wget 
brew install wget

# remove previous versions of chromedriver and selenium-standalone
rm $INSTALLATION_DIR/selenium-server-standalone-*.jar
rm $INSTALLATION_DIR/chromedriver

# install chrome driver
wget -N http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_mac64.zip -P $INSTALLATION_DIR
unzip $INSTALLATION_DIR/chromedriver_mac64.zip -d $INSTALLATION_DIR
rm $INSTALLATION_DIR/chromedriver_mac64.zip

# install selenium
wget -N http://selenium-release.storage.googleapis.com/$SELENIUM_SUBDIR/selenium-server-standalone-$SELENIUM_STANDALONE_VERSION.jar -P $INSTALLATION_DIR
mv -f $INSTALLATION_DIR/selenium-server-standalone-$SELENIUM_STANDALONE_VERSION.jar $INSTALLATION_DIR/selenium-server-standalone.jar