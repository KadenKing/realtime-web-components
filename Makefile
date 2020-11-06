upload:
	rsync -rvz server/lib/ project@157.230.236.37:/home/project/realtime-web-components/server/lib/

upload_everything:
	rsync -rvz server/ project@157.230.236.37:/home/project/realtime-web-components/server/