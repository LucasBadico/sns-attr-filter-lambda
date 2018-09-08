################
# DOCKER IMAGE #
################
IMAGE_NAME=serverless-vscode

################
#     VARS     #
################
stage=dev
region=us-east-1
container=api-accounts

################
# Entry Points #
################
send:
	sls deploy -v -s $(stage) -r $(region)
deploy:
	rm -fr package && \
	npm run build && \
	cp package.json package/ && \
	cp serverless.yml ./package/ && \
	cd package/ && npm install --production --no-bin-links && \
	sls deploy -v -s $(stage) -r $(region)

remove:
	cd package/ \
	sls remove -v -s $(stage) -r $(region)

offline:
	rm -fr package && \
	npm run build && \
	cp package.json package/ && \
	cp serverless.yml ./package/ && \
	cd package/ && npm install --production --no-bin-links && \
	serverless offline -s $(stage)

run:
	make _check_run_start_or_attach

_check_run_start_or_attach:
	./checkcontainer.sh $(container)

_attach:
	docker exec -i -t $(container) /bin/bash	

_start_container:
	docker start $(container)

_run_container:
	docker run -d \
	-d \
	-v /tmp/.X11-unix:/tmp/.X11-unix:rw \
	-v $${PWD}:/developer/project/ \
	-v ~/.aws:/developer/.aws \
	-v ~/.ssh:/developer/.ssh \
	-e DISPLAY=unix$${DISPLAY} \
	-p 5000:5000 \
	-p 3000:3000 \
	-p 3001:3001 \
	-p 8080:8080 \
	-p 8081:8081 \
	--device /dev/snd \
	--name $(container) \
	$(IMAGE_NAME)
	docker exec $(container) /developer/install-extensions.sh 
