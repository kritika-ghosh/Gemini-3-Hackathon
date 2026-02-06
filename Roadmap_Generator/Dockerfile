# Use the official Python image
FROM python:3.12

# Set the working directory
WORKDIR /code

# Copy the requirements file
COPY ./requirements.txt /code/requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application code
COPY . /code

# Start the application on port 7860 (Hugging Face's default port)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]