import sys
import subprocess
import tempfile
import os
from io import StringIO
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import contextlib

@api_view(['POST'])
@csrf_exempt
def execute_code(request):
    code = request.data.get('code', '')
    language = request.data.get('language', 'python')
    
    try:
        if language == 'python':
            return execute_python(code)
        elif language == 'c':
            return execute_c(code)
        elif language == 'java':
            return execute_java(code)
        else:
            return Response({
                'output': '',
                'error': f'Unsupported language: {language}'
            }, status=400)
            
    except Exception as e:
        return Response({
            'output': '',
            'error': str(e)
        }, status=400)

def execute_python(code):
    output = StringIO()
    try:
        with contextlib.redirect_stdout(output):
            exec(code)
        return Response({
            'output': output.getvalue(),
            'error': None
        })
    except Exception as e:
        return Response({
            'output': '',
            'error': str(e)
        }, status=400)

def execute_c(code):
    with tempfile.TemporaryDirectory() as tmp_dir:
        src_path = os.path.join(tmp_dir, 'main.c')
        exe_path = os.path.join(tmp_dir, 'main')
        
        with open(src_path, 'w') as f:
            f.write(code)
        
        try:
            compile_process = subprocess.run(
                ['gcc', src_path, '-o', exe_path],
                capture_output=True,
                text=True
            )
            
            if compile_process.returncode != 0:
                return Response({
                    'output': '',
                    'error': compile_process.stderr
                }, status=400)
            
            run_process = subprocess.run(
                [exe_path],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            return Response({
                'output': run_process.stdout,
                'error': run_process.stderr if run_process.returncode != 0 else None
            })
            
        except subprocess.TimeoutExpired:
            return Response({
                'output': '',
                'error': 'Execution timed out'
            }, status=400)

def execute_java(code):
    with tempfile.TemporaryDirectory() as tmp_dir:
        if 'class Main' not in code:
            code = f'public class Main {{ public static void main(String[] args) {{ {code} }} }}'
        
        src_path = os.path.join(tmp_dir, 'Main.java')
        with open(src_path, 'w') as f:
            f.write(code)
        
        try:
            compile_process = subprocess.run(
                ['javac', src_path],
                capture_output=True,
                text=True
            )
            
            if compile_process.returncode != 0:
                return Response({
                    'output': '',
                    'error': compile_process.stderr
                }, status=400)
            
            run_process = subprocess.run(
                ['java', '-cp', tmp_dir, 'Main'],
                capture_output=True,
                text=True,
                timeout=5
            )
            
            return Response({
                'output': run_process.stdout,
                'error': run_process.stderr if run_process.returncode != 0 else None
            })
            
        except subprocess.TimeoutExpired:
            return Response({
                'output': '',
                'error': 'Execution timed out'
            }, status=400)
