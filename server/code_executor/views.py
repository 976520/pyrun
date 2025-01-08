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
    language = request.data.get('language', '')

    if language == 'python':
        return execute_python(code)
    elif language == 'c':
        return execute_c(code)
    elif language == 'java':
        return execute_java(code)
    elif language == 'kotlin':
        return execute_kotlin(code)
    elif language in ['typescript', 'javascript']:
        return execute_typescript(code)
    elif language == 'cpp':
        return execute_cpp(code)
    else:
        return Response({
            'output': '',
            'error': f'Unsupported language: {language}'
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
            }, status=408)

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
            }, status=408)  

def execute_kotlin(code):
    with tempfile.TemporaryDirectory() as tmp_dir:
        src_path = os.path.join(tmp_dir, 'Main.kt')
        with open(src_path, 'w') as f:
            if 'fun main' not in code:
                code = f'fun main() {{ {code} }}'
            f.write(code)
        
        try:
            compile_process = subprocess.run(
                ['kotlinc', src_path, '-d', tmp_dir],
                capture_output=True,
                text=True
            )
            
            if compile_process.returncode != 0:
                return Response({
                    'output': '',
                    'error': compile_process.stderr
                }, status=400)
            
            run_process = subprocess.run(
                ['kotlin', 'MainKt'],
                cwd=tmp_dir,
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
            }, status=408)

def execute_typescript(code):
    with tempfile.TemporaryDirectory() as tmp_dir:
        if language == 'javascript':
            js_path = os.path.join(tmp_dir, 'main.js')
            with open(js_path, 'w') as f:
                f.write(code)
            
            try:
                run_process = subprocess.run(
                    ['node', js_path],
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
                }, status=408)
        
        src_path = os.path.join(tmp_dir, 'main.ts')
        with open(src_path, 'w') as f:
            f.write(code)
        
        try:
            compile_process = subprocess.run(
                ['tsc', src_path, '--outDir', tmp_dir],
                capture_output=True,
                text=True
            )
            
            if compile_process.returncode != 0:
                return Response({
                    'output': '',
                    'error': compile_process.stderr
                }, status=400)
            
            run_process = subprocess.run(
                ['node', os.path.join(tmp_dir, 'main.js')],
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
            }, status=408)

def execute_cpp(code):
    with tempfile.TemporaryDirectory() as tmp_dir:
        src_path = os.path.join(tmp_dir, 'main.cpp')
        exe_path = os.path.join(tmp_dir, 'main')
        
        with open(src_path, 'w') as f:
            f.write(code)
        
        try:
            compile_process = subprocess.run(
                ['g++', src_path, '-o', exe_path],
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
            }, status=408)
