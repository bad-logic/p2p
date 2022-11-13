# generating self signed ssl certificates using openssl

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout certs/private.key -out certs/certificate.crt -subj "/C=NP/ST=state1/L=city1/O=Test/OU=Org43/CN=localhost/emailAddress=tets@localhost.com"

echo "self signed certificate"
openssl x509 -in certificate.crt -noout -text