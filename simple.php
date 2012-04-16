<?php
$content1 = file_get_contents('student/123/index.php');
$content2 = file_get_contents('student/123/css/common.css');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Simple Layout Demo</title>
		<!-- LAYOUT v 1.3.0 -->
		<link rel="stylesheet" href="lib/css/layout-default-latest.css">

		<!-- TREEVIEW v 1.5pre -->
		<link rel="stylesheet" href="js/jquery.treeview-1.5pre/jquery.treeview.css">

		<!-- CODEMIRROR v 2.23 -->
		<link rel="stylesheet" href="js/CodeMirror-2.23/lib/codemirror.css">

		<!-- JQUERY UI v 1.8.18 -->
		<link rel="stylesheet" href="js/jquery-ui-1.8.18.custom/css/smoothness-hard/jquery-ui-1.8.18.custom.css">

		<!-- PAGE SPECIFIC STYLES -->
		<link rel="stylesheet" href="css/simple.css">

	</head>
	<body>
		<div class="ui-layout-west">
			<div id="filebrowser_wrapper">
				<ul id="filetree" class="filetree treeview-famfamfam">
					<li class="open">
						<span class="folder">Webroot</span>
						<ul>
							<li>
								<span class="folder">images</span>
							</li>
							<li>
								<span class="folder">css</span>
								<ul>
									<li>
										<span class="file"><a href="simple.php?file=/css/common.css">common.css</a></span>
									</li>
								</ul>
							</li>
							<li>
								<span class="folder">js</span>
							</li>
							<li>
								<span class="file"><a href="simple.php?file=/index.php">index.php</a></span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="ui-layout-center">
			<div id="code_wrapper">
				<div id="tabs">
					<ul>
						<li><a href="#tabs-1">/index.php</a> <a href="#" id="close-tabs-1" class="close-tabs">x</a></li>
						<li><a href="#tabs-2">/css/common.css</a> <a href="#" id="close-tabs-2" class="close-tabs">x</a></li>
					</ul>
					<div id="tabs-1">
						<form action="render.php" target="rendered" method="post">
							<textarea name="code" id="tabs1-code" class="code-editor"><?php echo $content1; ?></textarea><br />
							<input type="hidden" name="file" value="/index.php" />
							<input type="submit" name="submit" value="SAVE &amp; RUN" />
						</form>
					</div>
					<div id="tabs-2">
						<form action="render.php" target="rendered" method="post">
							<textarea name="code" id="tabs2-code" class="code-editor"><?php echo $content2; ?></textarea><br />
							<input type="hidden" name="file" value="/css/common.css" />
							<input type="submit" name="submit" value="SAVE &amp; RUN" />
						</form>
					</div>
				</div>
			</div>
		</div>


		<div class="ui-layout-east">
			<div id="rendered_wrapper">
				<iframe id="rendered" name="rendered"></iframe>
			</div>
		</div>

		<!-- SCRIPTS -->
		<!--[if lt IE 9]>
				<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<!-- LAYOUT v 1.3.0 -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
		<script src="lib/js/jquery-ui-1.8.16.js"></script>
		<script src="lib/js/jquery.layout-1.3.0-rc30.4.js"></script>

		<!-- TREEVIEW v 1.5pre -->
		<script src="js/jquery.treeview-1.5pre/jquery.treeview.js"></script>


		<!-- CODEMIRROR v 2.23 -->
		<script src="js/CodeMirror-2.23/lib/codemirror.js"></script>
		<script src="js/CodeMirror-2.23/mode/php/php.js"></script>
		<script src="js/CodeMirror-2.23/mode/xml/xml.js"></script>
		<script src="js/CodeMirror-2.23/mode/javascript/javascript.js"></script>
		<script src="js/CodeMirror-2.23/mode/css/css.js"></script>
		<script src="js/CodeMirror-2.23/mode/clike/clike.js"></script>

		<!-- JQUERY UI v 1.8.18 -->
		<script src="js/jquery-ui-1.8.18.custom/js/jquery-ui-1.8.18.custom.min.js"></script>

		<!-- PAGE SPECIFIC SCRIPT -->
		<script src="js/simple.js"></script>
	</body>
</html>