
FROM ubuntu:16.04
MAINTAINER Juergen Schackmann

# -----------------------------------------------------------------------------
# General environment variables
# -----------------------------------------------------------------------------
ENV DEBIAN_FRONTEND=noninteractive


# -----------------------------------------------------------------------------
# Install system basics
# -----------------------------------------------------------------------------
RUN \
  apt-get update -qqy && \
  apt-get install -qqy --allow-unauthenticated \
          apt-transport-https \
          python-software-properties \
          software-properties-common \
          curl \
          expect \
          zip \
          libsass-dev \
          git \
          wget \
          unzip \
          sudo


# -----------------------------------------------------------------------------
# Install Java
# -----------------------------------------------------------------------------
ARG JAVA_VERSION
ENV JAVA_VERSION ${JAVA_VERSION:-8}

ENV JAVA_HOME ${JAVA_HOME:-/usr/lib/jvm/java-${JAVA_VERSION}-openjdk-amd64}

RUN \
  add-apt-repository ppa:openjdk-r/ppa && \
  apt-get install -y openjdk-${JAVA_VERSION}-jdk

# ------------------------------------------------------
# --- Download Android Command line Tools into $ANDROID_SDK_ROOT
ARG ANDROID_SDK_TOOLS
ENV ANDROID_SDK_TOOLS ${ANDROID_SDK_TOOLS:-7583922}
ENV ANDROID_SDK_ROOT /opt/android-sdk-linux
ENV ANDROID_HOME /opt/android-sdk-linux
RUN cd /opt \
    && wget -q https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip -O android-commandline-tools.zip \
    && mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools \
    && unzip -q android-commandline-tools.zip -d /tmp/ \
    && mv /tmp/cmdline-tools/ ${ANDROID_SDK_ROOT}/cmdline-tools/latest \
    && rm android-commandline-tools.zip && ls -la ${ANDROID_SDK_ROOT}/cmdline-tools/latest/

ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin

# ------------------------------------------------------
# --- Install Android SDKs and other build packages

# Other tools and resources of Android SDK
#  you should only install the packages you need!
# To get a full list of available options you can use:
#  sdkmanager --list

# Accept licenses before installing components, no need to echo y for each component
# License is valid for all the standard components in versions installed from this file
# Non-standard components: MIPS system images, preview versions, GDK (Google Glass) and Android Google TV require separate licenses, not accepted there
RUN yes | sdkmanager --licenses

RUN touch /root/.android/repositories.cfg

# Emulator and Platform tools
RUN yes | sdkmanager "emulator" "platform-tools"

# SDKs
# Please keep these in descending order!
# The `yes` is for accepting all non-standard tool licenses.

RUN yes | sdkmanager --update --channel=3
# Please keep all sections in descending order!
RUN yes | sdkmanager \
    "platforms;android-30" \
    "platforms;android-29" \
    "platforms;android-28" \
    "platforms;android-27" \
    "platforms;android-26" \
    "platforms;android-25" \
    "platforms;android-24" \
    "platforms;android-23" \
    "platforms;android-22" \
    "platforms;android-21" \
    "platforms;android-19" \
    "platforms;android-17" \
    "platforms;android-15" \
    "build-tools;30.0.3" \
    "build-tools;30.0.2" \
    "build-tools;30.0.0" \
    "build-tools;29.0.3" \
    "build-tools;29.0.2" \
    "build-tools;29.0.1" \
    "build-tools;29.0.0" \
    "build-tools;28.0.3" \
    "build-tools;28.0.2" \
    "build-tools;28.0.1" \
    "build-tools;28.0.0" \
    "build-tools;27.0.3" \
    "build-tools;27.0.2" \
    "build-tools;27.0.1" \
    "build-tools;27.0.0" \
    "build-tools;26.0.2" \
    "build-tools;26.0.1" \
    "build-tools;25.0.3" \
    "build-tools;24.0.3" \
    "build-tools;23.0.3" \
    "build-tools;22.0.1" \
    "build-tools;21.1.2" \
    "build-tools;19.1.0" \
    "build-tools;17.0.0" \
    "system-images;android-30;google_apis;x86" \
    "system-images;android-29;google_apis;x86" \
    "system-images;android-28;google_apis;x86_64" \
    "system-images;android-26;google_apis;x86" \
    "system-images;android-25;google_apis;armeabi-v7a" \
    "system-images;android-24;default;armeabi-v7a" \
    "system-images;android-22;default;armeabi-v7a" \
    "system-images;android-19;default;armeabi-v7a" \
    "extras;android;m2repository" \
    "extras;google;m2repository" \
    "extras;google;google_play_services" \
    "extras;m2repository;com;android;support;constraint;constraint-layout;1.0.2" \
    "extras;m2repository;com;android;support;constraint;constraint-layout;1.0.1" \
    "add-ons;addon-google_apis-google-23" \
    "add-ons;addon-google_apis-google-22" \
    "add-ons;addon-google_apis-google-21"

# ------------------------------------------------------
# --- Install Gradle from PPA

# Gradle PPA
ENV GRADLE_VERSION=7.2
ENV PATH=$PATH:"/opt/gradle/gradle-6.3/bin/"
RUN wget https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -P /tmp
RUN unzip -d /opt/gradle /tmp/gradle-*.zip
RUN chmod +775 /opt/gradle
# RUN gradle --version
RUN rm -rf /tmp/gradle*

# ------------------------------------------------------
# --- Install Maven 3 from PPA

RUN apt-get purge maven maven2 \
 && apt-get update \
 && apt-get -y install maven

# Reselect JAVA 8  as default
RUN sudo update-java-alternatives --jre-headless --set java-1.8.0-openjdk-amd64
RUN sudo update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64

# ------------------------------------------------------
# --- Install Google Cloud SDK
# https://cloud.google.com/sdk/downloads
#  Section: apt-get (Debian and Ubuntu only)
#
# E.g. for "Using Firebase Test Lab for Android from the gcloud Command Line":
#  https://firebase.google.com/docs/test-lab/command-line
#

RUN echo "deb https://packages.cloud.google.com/apt cloud-sdk-`lsb_release -c -s` main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
RUN sudo apt-get update -qq \
 && sudo apt-get install -y -qq google-cloud-sdk

ENV GCLOUD_SDK_CONFIG /usr/lib/google-cloud-sdk/lib/googlecloudsdk/core/config.json

# gcloud config doesn't update config.json. See the official Dockerfile for details:
#  https://github.com/GoogleCloudPlatform/cloud-sdk-docker/blob/master/Dockerfile
RUN /usr/bin/gcloud config set --installation component_manager/disable_update_check true \
 && sed -i -- 's/\"disable_updater\": false/\"disable_updater\": true/g' $GCLOUD_SDK_CONFIG \
 && /usr/bin/gcloud config set --installation core/disable_usage_reporting true \
 && sed -i -- 's/\"disable_usage_reporting\": false/\"disable_usage_reporting\": true/g' $GCLOUD_SDK_CONFIG

# -----------------------------------------------------------------------------
# Install Node, NPM, yarn
# -----------------------------------------------------------------------------
ARG NODE_VERSION
ENV NODE_VERSION ${NODE_VERSION:-6.9.5}

ARG NPM_VERSION
ENV NPM_VERSION ${NPM_VERSION:-5.3.0}

ARG PACKAGE_MANAGER
ENV PACKAGE_MANAGER ${PACKAGE_MANAGER:-npm}

ENV NPM_CONFIG_LOGLEVEL info

# gpg keys listed at https://github.com/nodejs/node
#RUN set -ex
#
#RUN for key in \
#    9554F04D7259F04124DE6B476D5A82AC7E37093B \
#    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
#    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
#    FD3A5288F042B6850C66B31F09FE44734EB7990E \
#    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
#    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
#    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
#    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
#  ; do
#
#RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "${key}"; \
#  done
#RUN \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys 4ED778F539E3634C779C87C6D7062848A1AB005C && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5 && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys 74F12602B6F1C4E913FAA37AD3A89613643B6201 && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys 8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys A48C2BEE680E841632CD4E44F07496B3EB3C1762 && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys 108F52B48DB57BB0CC439B2997B01419BD92F80A && \
#  gpg --keyserver pool.sks-keyservers.net --recv-keys B9E2F5981AA6E0CD28160D9FF13993A75599653C


#RUN \
#  curl -SLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" && \
#  curl -SLO "https://nodejs.org/dist/v${NODE_VERSION}/SHASUMS256.txt.asc" && \
#  gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc && \
#  grep " node-v${NODE_VERSION}-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - && \
#  tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 && \
#  rm "node-v${NODE_VERSION}-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt && \
#  ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
#  chmod 777 /usr/local/lib/node_modules -R

#RUN \
#  curl -SLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" && \
#  tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 && \

#RUN \
#  npm install -g npm@${NPM_VERSION} && \
#  if [ "${PACKAGE_MANAGER}" = "yarn" ]; then \
#    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#    apt-get update -qqy && apt-get install -qqy --allow-unauthenticated yarn; \
#  fi

ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE

ENV NODE_PATH $NODE_HOME/lib/node_modules
ENV PATH $NODE_HOME/bin:$PATH

RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/ && \
#  rm "node-v${NODE_VERSION}-linux-x64.tar.gz" && \
#  ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
  chmod 777 /opt/node-v14.15.5-linux-x64/lib/node_modules -R && \
  npm install -g npm@${NPM_VERSION}

# comes with npm
# RUN npm install -g typescript

# ------------------------------------------------------
# --- Install Firebase Tools (Firebase CLI)
# https://github.com/firebase/firebase-tools
#
# It's required for using Firebase App Distribution.
#  https://firebase.google.com/products/app-distribution
#

RUN npm install -g firebase-tools


# -----------------------------------------------------------------------------
# Clean up
# -----------------------------------------------------------------------------
RUN \
  apt-get clean && \
  apt-get autoclean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


# -----------------------------------------------------------------------------
# Create a non-root docker user to run this container
# -----------------------------------------------------------------------------
#ARG USER
#ENV USER ${USER:-ionic}
#
#RUN \
#  # create user with appropriate rights, groups and permissions
#  useradd --user-group --create-home --shell /bin/false ${USER} && \
#  echo "${USER}:${USER}" | chpasswd && \
#  adduser ${USER} sudo && \
#  adduser ${USER} root && \
#  chmod 770 / && \
#  usermod -a -G root ${USER} && \
#
#  # create the file and set permissions now with root user
#  mkdir /app && chown ${USER}:${USER} /app && chmod 777 /app && \
#
#  # create the file and set permissions now with root user
#  touch /image.config && chown ${USER}:${USER} /image.config && chmod 777 /image.config && \
#
#  # this is necessary for ionic commands to run
#  mkdir /home/${USER}/.ionic && chown ${USER}:${USER} /home/${USER}/.ionic && chmod 777 /home/${USER}/.ionic && \
#
#  # this is necessary to install global npm modules
#  chmod 777 /usr/local/bin
#  #&& chown ${USER}:${USER} ${ANDROID_HOME} -R
#
#
## -----------------------------------------------------------------------------
## Copy start.sh and set permissions
## -----------------------------------------------------------------------------
#COPY start.sh /start.sh
#RUN chown ${USER}:${USER} /start.sh && chmod 777 /start.sh
#
#
## -----------------------------------------------------------------------------
## Switch the user of this image only now, because previous commands need to be
## run as root
## -----------------------------------------------------------------------------
#USER ${USER}


# -----------------------------------------------------------------------------
# Install Global node modules
# -----------------------------------------------------------------------------

ARG CORDOVA_VERSION
ENV CORDOVA_VERSION ${CORDOVA_VERSION:-7.0.1}

ARG CORDOVA_RES_VERSION
ENV CORDOVA_RES_VERSION ${CORDOVA_RES_VERSION:-0.15.3}

ARG IONIC_VERSION
ENV IONIC_VERSION ${IONIC_VERSION:-3.12.0}

ARG TYPESCRIPT_VERSION
ENV TYPESCRIPT_VERSION ${TYPESCRIPT_VERSION:-2.3.4}

ARG GULP_VERSION
ENV GULP_VERSION ${GULP_VERSION}

RUN \
  if [ "${PACKAGE_MANAGER}" != "yarn" ]; then \
    export PACKAGE_MANAGER="npm" && \
    npm install -g cordova@"${CORDOVA_VERSION}" && \
#    if [ -n "${CORDOVA_RES_VERSION}" ]; then npm install -g cordova-res@"${CORDOVA_RES_VERSION}"; fi && \
    if [ -n "${IONIC_VERSION}" ]; then npm install -g ionic@"${IONIC_VERSION}"; fi && \
    if [ -n "${TYPESCRIPT_VERSION}" ]; then npm install -g typescript@"${TYPESCRIPT_VERSION}"; fi && \
    if [ -n "${GULP_VERSION}" ]; then npm install -g gulp@"${GULP_VERSION}"; fi \
  else \
    yarn global add cordova@"${CORDOVA_VERSION}" && \
    if [ -n "${IONIC_VERSION}" ]; then yarn global add ionic@"${IONIC_VERSION}"; fi && \
    if [ -n "${TYPESCRIPT_VERSION}" ]; then yarn global add typescript@"${TYPESCRIPT_VERSION}"; fi && \
    if [ -n "${GULP_VERSION}" ]; then yarn global add gulp@"${GULP_VERSION}"; fi \
  fi && \
  ${PACKAGE_MANAGER} cache clean --force


# -----------------------------------------------------------------------------
# Create the image.config file for the container to check the build
# configuration of this container later on
# -----------------------------------------------------------------------------
RUN \
echo "USER: ${USER}\n\
JAVA_VERSION: ${JAVA_VERSION}\n\
ANDROID_PLATFORMS_VERSION: ${ANDROID_PLATFORMS_VERSION}\n\
ANDROID_BUILD_TOOLS_VERSION: ${ANDROID_BUILD_TOOLS_VERSION}\n\
NODE_VERSION: ${NODE_VERSION}\n\
NPM_VERSION: ${NPM_VERSION}\n\
PACKAGE_MANAGER: ${PACKAGE_MANAGER}\n\
CORDOVA_VERSION: ${CORDOVA_VERSION}\n\
IONIC_VERSION: ${IONIC_VERSION}\n\
TYPESCRIPT_VERSION: ${TYPESCRIPT_VERSION}\n\
GULP_VERSION: ${GULP_VERSION:-none}\n\
" >> /image.config && \
cat /image.config


## -----------------------------------------------------------------------------
## Generate an Ionic default app (do this with root user, since we will not
## have permissions for /app otherwise), install the dependencies
## and add and build android platform
## -----------------------------------------------------------------------------
#RUN \
#  cd / && \
#  ionic config set -g backend legacy && \
#  ionic start app blank --type ionic-angular --no-deps --no-link --no-git && \
#  cd /app && \
#  ${PACKAGE_MANAGER} install && \
#  ionic cordova platform add android --no-resources && \
#  ionic cordova build android


## -----------------------------------------------------------------------------
## Just in case you are installing from private git repositories, enable git
## credentials
## -----------------------------------------------------------------------------
#RUN git config --global credential.helper store


# -----------------------------------------------------------------------------
# WORKDIR is the generic /app folder. All volume mounts of the actual project
# code need to be put into /app.
# -----------------------------------------------------------------------------
WORKDIR /app


# -----------------------------------------------------------------------------
# The script start.sh installs package.json and puts a watch on it. This makes
# sure that the project has allways the latest dependencies installed.
# -----------------------------------------------------------------------------
#ENTRYPOINT ["/start.sh"]


# -----------------------------------------------------------------------------
# After /start.sh the bash is called.
# -----------------------------------------------------------------------------
#CMD ["ionic", "serve", "-b", "-p", "8100", "--address", "0.0.0.0"]
CMD ["sh"]
