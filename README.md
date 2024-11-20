# AtomicKnight 
Link for testing: https://miromanovdaniil.github.io/atomic-knight/

## Deployment on GitHab pages

### Requirements

1. **Node.js** - Ensure you have [Node.js](https://nodejs.org/) installed (version 14.x or higher).

   ```bash
   node -v
   ```

2. **Angular CLI** - Install Angular CLI globally if not already installed:

   ```bash
   npm install -g @angular/cli
   ```
   
3. **Navigate to Your Project Directory**
      
     ```bash
   cd /path/to/your/project
     ```
     
5. **Install Dependencies**
   
     ```bash
   npm install
     ```

6. **Install Angular CLI gh-pages**
   
     ```bash
   npm i angular-cli-ghpages --save-dev
     ```

7. **Build the Project**

     ```bash
   ng build --base-href "https://[username].github.io/[repository-name]/"
     ```

8. **Deploy the Build on GitHab pages**

     ```bash
   npx angular-cli-ghpages --dir=dist/[repository-name]/browser
     ```

## Deployment on local host

### Requirements

1. **Node.js** - Ensure you have [Node.js](https://nodejs.org/) installed (version 14.x or higher).

   ```bash
   node -v
   ```

2. **Angular CLI** - Install Angular CLI globally if not already installed:

   ```bash
   npm install -g @angular/cli
   ```

3. **Clone repository**:
   
   ```bash
   git clone https://github.com/MiromanovDaniil/atomic-knight.git)
   cd <your-project directory>/atomic-knight
   ```

5. **Install all dependencies**
   
   ```bash
   npm install
   ```

6. **Start the local development server**

    ```bash
    ng serve
    ```

![image](https://github.com/user-attachments/assets/c9a0f7b7-2d94-4f08-8252-ca1b13006429)
