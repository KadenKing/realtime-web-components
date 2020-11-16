start:
	mix deps.get --only prod
	MIX_ENV=prod mix compile
	npm run deploy --prefix ./assets
	mix phx.digest
	sudo PORT=80 MIX_ENV=prod mix phx.server