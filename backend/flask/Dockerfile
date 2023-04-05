FROM python:3.9
COPY . /flask
WORKDIR /flask
RUN pip3 install -r requirements.txt
RUN chmod 777 /flask/wsgi.py
CMD ["python3.9", "wsgi.py"]
