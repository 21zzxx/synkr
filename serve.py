from livereload import Server, shell

def main():
    # Create a new server
    server = Server()
    
    # Watch all HTML, CSS, and JS files
    server.watch('*.html')
    server.watch('*.css')
    server.watch('*.js')
    
    # Serve the files
    server.serve(root='.', port=8000)

if __name__ == '__main__':
    main() 