gen-rq:
	curl -o bank.yaml http://localhost:1323/swagger/doc.yaml
	sudo chmod 777 bank.yaml # idk why but it's not working without this
	npm run codegen
	rm bank.yaml