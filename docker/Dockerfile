FROM ubuntu:22.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y nano jq curl wget python3-pip && pip install llm-shell weasel stonemill
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
	apt-get install -y nodejs
RUN useradd -ms /bin/bash runuser
USER runuser
WORKDIR /app
CMD ["bash"]
