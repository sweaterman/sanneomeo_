FROM python:3.9
COPY . /flask
WORKDIR /flask
RUN chmod 777 /flask/wsgi.py
CMD ["python3.9", "wsgi.py"]
