import { spawn } from 'child_process';

export default async (req, res) => {
  try {
    // Get the Python script path from the request query or request body
    const pythonScriptPath = req.query.pythonScriptPath || req.body.pythonScriptPath;

    if (!pythonScriptPath) {
      res.status(400).json({ error: 'Python script path is missing.' });
      return;
    }

    const pythonProcess = spawn('python', [pythonScriptPath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python Script Output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Script Error: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
      if (code === 0) {
        try {
          res.status(200).json({ message: 'Python script executed successfully.' });
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Error fetching data.' });
        }
      } else {
        res.status(500).json({ error: 'Error executing Python script.' });
      }
    });
  } catch (error) {
    console.error('Error executing Python script:', error);
    res.status(500).json({ error: 'Error executing Python script.' });
  }
};
