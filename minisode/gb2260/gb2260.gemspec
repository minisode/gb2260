Gem::Specification.new do |spec|
  spec.name       = 'gb2260'
  spec.version    = '1.0.1'
  spec.license    = 'MIT'
  spec.author     = 'minisode'
  spec.email      = 'minisode@189.cn'
  spec.executable = 'gb2260'
  spec.files      = Dir['lib/**/*']
  spec.summary    = 'A simple library for looking-up administrative divisions'
  spec.homepage   = 'https://minisode.surge.sh/gb2260'

  spec.add_development_dependency 'minitest', '~> 5.11'
  spec.add_runtime_dependency 'mercenary', '~> 0.3.6'
end
