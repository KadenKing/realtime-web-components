start:
	mix deps.get --only prod
	MIX_ENV=prod mix compile
	npm run deploy --prefix ./assets
	mix phx.digest
	PORT=4000 MIX_ENV=prod elixir --erl "-detached" -S mix phx.server