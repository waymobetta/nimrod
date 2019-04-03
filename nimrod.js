#!/usr/bin/env node

const fs = require('fs')
const keythereum = require('keythereum')

const keystore_file = './keystore.json'
const pass_file = './passwords'

const keyObj = JSON.parse(fs.readFileSync(keystore_file, 'utf8'))
const passwords = fs.readFileSync(pass_file, 'utf8')

password_list = passwords.split('\n')

password_list.forEach(password => {
	try {
		const private_key = keythereum.recover(password, keyObj)
		if (private_key.length === 32) {
			console.log(`[*] found password: ${password}`)
			process.exit(1)
		}
	} catch (err) {
		console.log(`[-] incorrect password: ${password}`)
	}
})
