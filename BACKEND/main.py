from server import create_app

app = create_app(dev_config=True)

if __name__ == "__main__":
    app.run()