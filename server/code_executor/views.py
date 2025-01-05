from django.shortcuts import render
import sys
from io import StringIO
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import contextlib

@api_view(['POST'])
@csrf_exempt
def execute_code(request):
    code = request.data.get('code', '')
    
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
